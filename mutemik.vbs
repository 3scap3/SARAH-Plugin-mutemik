set WshShell = WScript.CreateObject("WScript.Shell")

'WshShell.Run "control mmsys.cpl"

REM Sequence desactivation 1 ere index
WScript.Sleep 1000
WshShell.AppActivate "Son"
WScript.Sleep 1000
WshShell.SendKeys "^({TAB})"
WScript.Sleep 1000
WshShell.SendKeys "{DOWN}"
WScript.Sleep 1000
WshShell.SendKeys "+({F10})"
WScript.Sleep 1000
REM WshShell.SendKeys "{DOWN}"
REM WScript.Sleep 1000
REM WshShell.SendKeys "{DOWN}"
REM WScript.Sleep 1000
REM WshShell.SendKeys "{ENTER}"
WshShell.SendKeys "D"
REM WScript.Sleep 500
REM WshShell.SendKeys "*3"
REM WScript.Sleep 500
REM WshShell.SendKeys "~"
REM WScript.Sleep 2500