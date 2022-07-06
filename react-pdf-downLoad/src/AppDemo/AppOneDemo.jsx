import React, { useRef } from "react"
import html2canvas from "html2canvas"
import { jsPDF } from "jspdf"
import Father from "../views/Father"

export function AppOneDemo() {
  const printRef = useRef()

  const handleDownloadPdf = async () => {
    const element = printRef.current
    const canvas = await html2canvas(element)
    const data = canvas.toDataURL("image/png")

    const pdf = new jsPDF()
    const imgProperties = pdf.getImageProperties(data)
    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width
   
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight)
    pdf.save('print.pdf')

  }

  return (
    <>
      <button type="button" onClick={handleDownloadPdf}>
        Download as PDF
      </button>

      <div>PDF ggsgxsx</div>
      <div ref={printRef}>I will be in the PDF.</div>
      <Father />
    </>
  )
}