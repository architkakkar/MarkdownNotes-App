import React, { useState } from "react"
import Showdown from "showdown"
import ReactMde from "react-mde"
import 'react-mde/lib/styles/css/react-mde-all.css'

export default function Editor({ tempNoteText, setTempNoteText }) {
    // State to manage the selected tab in the ReactMde component
    const [selectedTab, setSelectedTab] = useState("write")

    // Showdown converter for converting markdown to HTML
    const converter = new Showdown.Converter({
        tables: true,
        simplifiedAutoLink: true,
        strikethrough: true,
        tasklists: true,
    })

    // Render the Editor component
    return (
        <section className="pane editor">
            <ReactMde
                value={tempNoteText}
                onChange={setTempNoteText}
                selectedTab={selectedTab}
                onTabChange={setSelectedTab}
                generateMarkdownPreview={(markdown) =>
                    Promise.resolve(converter.makeHtml(markdown))
                }
                minEditorHeight={85}
                heightUnits="dvh"
            />
        </section>
    )
}
