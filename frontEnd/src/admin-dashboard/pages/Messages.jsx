import React, { useEffect, useState } from "react";
import axios from "axios";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/messages", {
          headers: { Authorization: `Bearer ${token}` },
          
        });
        setMessages(res.data);
      } catch (err) {
        setError("فشل في تحميل الرسائل");
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">رسائل التواصل</h1>

      {loading ? (
        <p>جاري التحميل...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : messages.length === 0 ? (
        <p className="text-gray-600">لا توجد رسائل حالياً.</p>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg._id}
              className="border p-4 rounded shadow-sm bg-white"
            >
              <div className="mb-2">
                <strong>الاسم:</strong> {msg.name}
              </div>
              <div className="mb-2">
                <strong>البريد:</strong> {msg.email}
              </div>
              <div className="mb-2">
                <strong>التاريخ:</strong> {new Date(msg.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>الرسالة:</strong>
                <p className="mt-1 text-gray-700 whitespace-pre-wrap">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
