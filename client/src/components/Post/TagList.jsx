import React from "react"
import { Link } from "react-router-dom"

export const TagList = ({ tags }) => {
    return (
        <div>
            <ul className="d-flex align-items-center">
                {tags?.map((tag, idx) => (
                    <Link key={idx}>{tag.name}</Link>
                ))}
            </ul>
        </div>
    )
}
