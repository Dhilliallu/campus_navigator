"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  Send,
  Leaf,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";

interface Post {
  id: number;
  author: string;
  avatar: string;
  time: string;
  content: string;
  plant: string;
  disease: string;
  likes: number;
  comments: number;
  liked: boolean;
}

const initialPosts: Post[] = [
  {
    id: 1,
    author: "Ravi Kumar",
    avatar: "RK",
    time: "2 hours ago",
    content: "Found early blight on my tomato plants. Applied neem oil spray and it seems to be working! Has anyone tried Bordeaux mixture for this?",
    plant: "Tomato",
    disease: "Early Blight",
    likes: 24,
    comments: 8,
    liked: false,
  },
  {
    id: 2,
    author: "Lakshmi Devi",
    avatar: "LD",
    time: "5 hours ago",
    content: "My rice crop is showing blast symptoms. Applied tricyclazole as recommended by PlantGuard AI. Will update on the results in a week.",
    plant: "Rice",
    disease: "Rice Blast",
    likes: 18,
    comments: 12,
    liked: false,
  },
  {
    id: 3,
    author: "Suresh Reddy",
    avatar: "SR",
    time: "1 day ago",
    content: "Great news! After following the organic treatment plan from PlantGuard AI, my apple trees are recovering from scab. Sulfur spray + proper pruning worked wonders.",
    plant: "Apple",
    disease: "Apple Scab",
    likes: 42,
    comments: 15,
    liked: false,
  },
  {
    id: 4,
    author: "Priya Sharma",
    avatar: "PS",
    time: "2 days ago",
    content: "Tip for potato farmers: Hill your soil early and apply copper fungicide before monsoon season. Prevented late blight this year!",
    plant: "Potato",
    disease: "Prevention Tips",
    likes: 56,
    comments: 22,
    liked: false,
  },
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState("");
  const [showAuth, setShowAuth] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();

  const handleLike = (postId: number) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  };

  const handlePost = () => {
    if (!newPost.trim()) return;
    if (!user) {
      setShowAuth(true);
      return;
    }
    const post: Post = {
      id: Date.now(),
      author: user.displayName || user.email || "Anonymous",
      avatar: (user.displayName || user.email || "A").substring(0, 2).toUpperCase(),
      time: "Just now",
      content: newPost,
      plant: "General",
      disease: "Discussion",
      likes: 0,
      comments: 0,
      liked: false,
    };
    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50/50 to-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 rounded-full text-orange-700 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            {t("community")}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Farmer Community</h1>
          <p className="text-gray-600">Share experiences, ask questions, and help fellow farmers</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-6"
        >
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-medium text-sm shrink-0">
              {user ? (user.displayName || user.email || "U").substring(0, 2).toUpperCase() : <Leaf className="w-5 h-5" />}
            </div>
            <div className="flex-1">
              <textarea
                value={newPost}
                onChange={(e) => setNewPost(e.target.value)}
                placeholder={t("sharePost")}
                className="w-full p-3 rounded-xl border border-gray-200 focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none resize-none text-sm"
                rows={3}
              />
              <div className="flex items-center justify-between mt-3">
                <button className="flex items-center gap-1.5 text-gray-500 hover:text-green-600 text-sm transition-colors">
                  <ImageIcon className="w-4 h-4" />
                  Add Photo
                </button>
                <button
                  onClick={handlePost}
                  className="flex items-center gap-1.5 px-5 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  Post
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="space-y-4">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-medium text-sm">
                  {post.avatar}
                </div>
                <div>
                  <p className="font-medium text-gray-800 text-sm">{post.author}</p>
                  <p className="text-xs text-gray-500">{post.time}</p>
                </div>
                <div className="ml-auto flex gap-2">
                  <span className="px-2 py-0.5 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                    {post.plant}
                  </span>
                  <span className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                    {post.disease}
                  </span>
                </div>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-4">{post.content}</p>

              <div className="flex items-center gap-6 pt-3 border-t border-gray-100">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center gap-1.5 text-sm transition-colors ${
                    post.liked ? "text-red-500" : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  <Heart className={`w-4 h-4 ${post.liked ? "fill-current" : ""}`} />
                  {post.likes} {t("like")}
                </button>
                <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-500 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  {post.comments} {t("comment")}
                </button>
                <button className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-green-600 transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
    </div>
  );
}
