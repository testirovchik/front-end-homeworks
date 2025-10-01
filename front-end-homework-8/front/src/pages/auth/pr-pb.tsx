import { useOutletContext } from "react-router-dom"
import { type IContext } from "../../types"
import { Axios } from "../../lib/api"
import { useState } from "react"

export const PublicPrivate = () => {
    const { account, setAccount } = useOutletContext<IContext>()
    const [loading, setLoading] = useState(false)

    const handleClick = () => {
        if (loading) return
        setLoading(true)
        Axios.patch("/account/set")
            .then(res => {
                setAccount({ ...account, isPrivate: res.data.payload })
            })
            .finally(() => setLoading(false))
    }

    return (
        <div className="flex justify-center items-center">
            <img
                onClick={handleClick}
                src={account.isPrivate ? import.meta.env.VITE_PRIVATE_PIC : import.meta.env.VITE_PUBLIC_PIC}
                alt="privacy toggle"
                className={`
                    w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-node 
                    shadow-lg cursor-pointer transition-all duration-300 transform
                    hover:scale-110 hover:rotate-6 active:scale-95
                    ${loading ? "opacity-50 cursor-not-allowed animate-pulse" : ""}
                `}
                title={account.isPrivate ? "Private Account" : "Public Account"}
            />
        </div>
    )
}
