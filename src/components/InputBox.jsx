import { useState } from "react"

const InputBox = ({ sendMessage, loading, solution }) => {
  const [input, setInput] = useState("")
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && input.trim() !== "") {
      e.preventDefault()
      sendMessage(input + " " + solution)
      setInput("")
    }
  }

  return (
    <div className="input-box">
      {loading && <progress style={{ width: "100%" }} />}
      <input
        disabled={loading}
        type="text"
        className="form-control"
        placeholder="Type check this..."
        value={loading ? "Loading..." : input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default InputBox
