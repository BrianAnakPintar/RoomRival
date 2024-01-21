import * as React from "react"
const QRButton = (props) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        className="icon flat-line"
        data-name="Flat Line"
        viewBox="0 0 24 24"
        {...props}
    >
        <path
            d="M13 11V7h4v4Zm-6 2v4h4v-4Z"
            style={{
                fill: "#2ca9bc",
                strokeWidth: 2,
            }}
        />
        <path
            d="M13 11V7h4v4Zm4 6v-2h-2v2ZM7 13v4h4v-4Zm0-6v2h2V7Z"
            style={{
                fill: "none",
                stroke: "#000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
            }}
        />
        <path
            d="M21 8V4a1 1 0 0 0-1-1h-4M16 21h4a1 1 0 0 0 1-1v-4M8 3H4a1 1 0 0 0-1 1v4M3 16v4a1 1 0 0 0 1 1h4"
            data-name="primary"
            style={{
                fill: "none",
                stroke: "#000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
            }}
        />
    </svg>
)
export default QRButton