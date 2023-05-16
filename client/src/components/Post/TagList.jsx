import React from "react"
import { Link } from "react-router-dom"

export const TagList = ({ tags }) => {
    console.log(tags)
    return (
        <div>
            <ul className="d-flex align-items-center">
                {tags?.map((tag, idx) => (
                    <Link>{tag.name}</Link>
                ))}
            </ul>
        </div>
    )
}
