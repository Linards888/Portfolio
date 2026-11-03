# Renders page 1 of each resume PDF to a PNG preview (cv_lv.png / cv_en.png).
# Uses the Windows PDF renderer, so it must run in Windows PowerShell 5.1.
Add-Type -AssemblyName System.Runtime.WindowsRuntime
$null = [Windows.Storage.StorageFile, Windows.Storage, ContentType = WindowsRuntime]
$null = [Windows.Data.Pdf.PdfDocument, Windows.Data.Pdf, ContentType = WindowsRuntime]
$null = [Windows.Storage.Streams.InMemoryRandomAccessStream, Windows.Storage.Streams, ContentType = WindowsRuntime]

$asTask = [System.WindowsRuntimeSystemExtensions].GetMethods() |
  Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
                 $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncOperation`1' } | Select-Object -First 1
$asTaskAction = [System.WindowsRuntimeSystemExtensions].GetMethods() |
  Where-Object { $_.Name -eq 'AsTask' -and $_.GetParameters().Count -eq 1 -and
                 $_.GetParameters()[0].ParameterType.Name -eq 'IAsyncAction' } | Select-Object -First 1
function Await($op, [Type]$type) { $asTask.MakeGenericMethod($type).Invoke($null, @($op)).Result }

$dir = $PSScriptRoot
foreach ($code in 'LV', 'EN') {
  $file = Await ([Windows.Storage.StorageFile]::GetFileFromPathAsync("$dir\Linards_Balodis_CV_$code.pdf")) ([Windows.Storage.StorageFile])
  $pdf = Await ([Windows.Data.Pdf.PdfDocument]::LoadFromFileAsync($file)) ([Windows.Data.Pdf.PdfDocument])
  $page = $pdf.GetPage(0)
  $opts = New-Object Windows.Data.Pdf.PdfPageRenderOptions
  $opts.DestinationWidth = [uint32]($page.Size.Width * 2.5)
  $opts.DestinationHeight = [uint32]($page.Size.Height * 2.5)
  $stream = New-Object Windows.Storage.Streams.InMemoryRandomAccessStream
  $asTaskAction.Invoke($null, @($page.RenderToStreamAsync($stream, $opts))).Wait()
  $net = [System.IO.WindowsRuntimeStreamExtensions]::AsStreamForRead($stream.GetInputStreamAt(0))
  $out = [System.IO.File]::Create("$dir\cv_$($code.ToLower()).png")
  $net.CopyTo($out); $out.Close(); $net.Close(); $page.Dispose()
  "rendered cv_$($code.ToLower()).png"
}
