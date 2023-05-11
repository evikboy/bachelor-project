import React from "react"
import { Link } from "react-router-dom"

export const TagList = ({ children }) => {
    return (
        <div>
            <ul className="d-flex align-items-center">
                <Link>java</Link>
                <Link>javascript</Link>
                <Link>programming</Link>
            </ul>
        </div>
    )
}
