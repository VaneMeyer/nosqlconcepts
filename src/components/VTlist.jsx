import React from "react"

import "./VTlist.css"

function VTlist(props) {
  const Clicked = () => {
    props.onClick(props.index)
  }

  return (
    <li key={props.index} style={{ listStyle: "none", textAlign: "left" }}>
      <button
        className="section__Tasks-button"
        onClick={Clicked}
        style={
          props.activeTabId === props.index
            ? { color: "#64ffda" }
            : { color: "#8892b0" }
        }
      >
        {props.data.slice(0, 8)}
      </button>
    </li>
  )
}

export default VTlist
