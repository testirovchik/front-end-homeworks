import { useEffect, useRef, useState } from "react"
import { Axios } from "../../lib/api";
import { type IPosts, type IResponse } from "../../types";

export const Posts = () => {
    const [posts, setPosts] = useState<IPosts[]>([]);
    const [text, setText] = useState("");
    const [preview, setPreview] = useState("");
    const picInput = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        Axios.get<IResponse<IPosts[]>>("/posts").then(res => {
            setPosts(res.data.payload);
        });
    }, []);

    const handlePreview = () => {
        if (picInput.current?.files) {
            const file = picInput.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => setPreview(reader.result as string);
        }
    };

    const handleUpload = () => {
        if (picInput.current?.files) {
            const file = picInput.current.files[0];
            const form = new FormData();
            form.append("photo", file);
            form.append("content", text);

            Axios.post<IResponse<IPosts>>("/posts", form).then((res) => {
                setPreview("");
                setText("");
                setPosts([res.data.payload, ...posts]);
            });
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-gray-900/80 backdrop-blur-lg rounded-3xl p-8 space-y-8 border border-gray-700 shadow-2xl">
            <h2 className="text-2xl font-extrabold text-indigo-400 text-center">
                Create a Post
            </h2>

            {/* Input box */}
            <div className="space-y-3">
                <label className="block text-gray-300 font-medium">Write something</label>
                <input
                    value={text}
                    onChange={e => setText(e.target.value)}
                    type="text" 
                    placeholder="What's on your mind?" 
                    className="w-full px-4 py-2 border border-gray-700 rounded-2xl bg-gray-800 text-gray-200 placeholder-gray-500 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                />
            </div>

            {/* Upload */}
            <div className="space-y-3">
                <h3 className="text-gray-300 font-medium">Upload a Picture</h3>
                <button 
                    onClick={() => picInput.current?.click()} 
                    className="bg-indigo-600 text-white rounded-xl px-5 py-2 hover:bg-indigo-500 transition transform hover:scale-[1.02]"
                >
                    Choose a Pic
                </button>
                <input 
                    type="file" 
                    className="hidden" 
                    ref={picInput} 
                    onChange={handlePreview}
                /> 

                {preview && (
                    <div className="mt-4 space-y-3">
                        <p className="text-gray-300 font-medium">Preview</p>
                        <img 
                            src={preview} 
                            className="w-56 h-56 object-cover border rounded-2xl shadow-lg"
                        />
                        <div className="flex space-x-4">
                            <button 
                                onClick={handleUpload} 
                                className="bg-green-600 text-white rounded-xl px-5 py-2 hover:bg-green-500 transition transform hover:scale-[1.02]"
                            >
                                Upload
                            </button>
                            <button 
                                onClick={() => setPreview("")} 
                                className="bg-red-600 text-white rounded-xl px-5 py-2 hover:bg-red-500 transition transform hover:scale-[1.02]"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Posts list */}
            <div className="space-y-6">
                {posts.map((post) => (
                    <div 
                        key={post.id} 
                        className="flex flex-col md:flex-row items-start md:items-center space-x-0 md:space-x-4 space-y-3 md:space-y-0 bg-gray-800/70 p-4 rounded-2xl border border-gray-700 shadow-lg hover:shadow-2xl transition transform hover:-translate-y-1"
                    >
                        <img 
                            className="w-full md:w-32 h-32 object-cover rounded-2xl border border-gray-600" 
                            src={import.meta.env.VITE_BASE + post.picture} 
                            alt="post"
                        />
                        <div className="flex-1">
                            {post.title && (
                                <p className="text-gray-400 mt-1 text-sm">{post.title}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
