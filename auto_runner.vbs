Set WshShell = CreateObject("WScript.Shell")
WshShell.CurrentDirectory = "C:\Users\berna\OneDrive\Documentos\AcharCliente"
WshShell.Run "cmd /c for /l %i in (1,0,2) do @(node server.js & timeout /t 3 >nul)", 0, False
