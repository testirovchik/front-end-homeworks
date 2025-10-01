import { useRef, useState } from "react"
import { Axios } from "../../../lib/api";
import { type IResponse } from "../../../types";
import { useNavigate } from "react-router-dom";

export const ImagePicker = () => {
    const [preview, setPreview] = useState("");
    const picInput = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate();
    const handlePreview = () => {
        if(picInput.current?.files) {
            const file = picInput.current.files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPreview(reader.result as string)
            }
        }
    }
    const handleUpload = () => {
        if(picInput.current?.files) {
            const file = picInput.current.files[0];
            const form = new FormData();
            form.append("picture", file);
            Axios.patch<IResponse<string>>("/profile/upload", form)
            .then(() => {
                navigate("/profile")
            })
        }
    }
    return <>
        <h1>Upload Profile Picture</h1>
        <button onClick={() => picInput.current?.click()} className="bg-indigo-400 rounded-md p-2 hover: bg-indigo-300">choose a pic</button>
        <input type="file" className="hidden" ref={picInput} onChange={handlePreview}/> 
        {
            preview && <div>
                <p>Preview</p>
                <img src={preview} className="w-[200px] h-[200px] border-2"/>
                <button onClick={handleUpload} className="bg-green-400 rounded-md p-2 m-2">upload</button>
                <button onClick={() => setPreview("")} className="bg-red-400 rounded-md p-2 m-2">cancel</button>
            </div>
        }
    </>
}