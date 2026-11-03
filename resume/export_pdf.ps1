# Exports the resume .docx files to PDF with Word and prints the page count of each.
$dir = $PSScriptRoot
$word = New-Object -ComObject Word.Application
$word.Visible = $false
try {
  foreach ($code in 'LV', 'EN') {
    $doc = $word.Documents.Open("$dir\Linards_Balodis_CV_$code.docx", $false, $true)
    "$code pages: " + $doc.ComputeStatistics(2)
    $doc.ExportAsFixedFormat("$dir\Linards_Balodis_CV_$code.pdf", 17)
    $doc.Close($false)
  }
} finally {
  $word.Quit()
}
