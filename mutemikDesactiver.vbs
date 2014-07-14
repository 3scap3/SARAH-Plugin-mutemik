
Set Args=WScript.Arguments ' tableau d'arguments

nmbr_Args = Args.Count ' nombre d'argument transmis
if (nmbr_Args > 0 ) then
	REM MSGBOX nmbr_Args
	'nombre de kinect 1 ou 2
	nmbr_kinect_def = Args(0) ' premier argument
	'index kinect1
	index_kinect1 = Args(1) ' second argument
	'index kinect2
	index_kinect2 = Args(2) ' troisieme argument
	
	REM msgbox nmbr_kinect_def & vbcrlf & _
		   REM index_kinect1 & vbcrlf & _
		   REM index_kinect2 
	
End if


set WshShell = WScript.CreateObject("WScript.Shell")

rem si une seul kinect :
if (nmbr_kinect_def = 1) then 
	REM OUVERTURE DU MANAGER AUDIO
	'WshShell.Run "control mmsys.cpl"

	WScript.Sleep 1000
	REM FOCUS SUR LE MANAGER AUDIO
	WshShell.AppActivate "Son"
	WScript.Sleep 1000
	REM TABULATION PREMIER ONGLET DROITE : ENREGISTREMENT
	WshShell.SendKeys "^({TAB})"
	WScript.Sleep 1000
	REM ON DESCEND DE UN - selection de l indexe
	for i = nmbr_kinect_def to index_kinect1 
		WshShell.SendKeys "{DOWN}"
		WScript.Sleep 1000
	next

	REM CLIQUE DROIT
	WshShell.SendKeys "+({F10})"
	WScript.Sleep 1000
	WshShell.SendKeys "D"
	WScript.Sleep 1000
	WshShell.SendKeys "{ESC}"
end if

rem si DEUX kinect :
if (nmbr_kinect_def = 2) then 
	REM OUVERTURE DU MANAGER AUDIO
	REM WshShell.Run "control mmsys.cpl"

	WScript.Sleep 1000
	REM FOCUS SUR LE MANAGER AUDIO
	WshShell.AppActivate "Son"
	WScript.Sleep 1000
	REM TABULATION PREMIER ONGLET DROITE : ENREGISTREMENT
	WshShell.SendKeys "^({TAB})"
	WScript.Sleep 1000
	
	REM ON DESCEND DE UN - selection de l indexe
	for i = 1 to index_kinect1
		WshShell.SendKeys "{DOWN}"
		WScript.Sleep 1000
	next
	REM CLIQUE DROIT
	WshShell.SendKeys "+({F10})"
	WScript.Sleep 1000
	WshShell.SendKeys "D"
	WScript.Sleep 1000
	
	REM ON DESCEND DE UN - selection de l indexe
	for i = 1 to index_kinect2 
		WshShell.SendKeys "{DOWN}"
		WScript.Sleep 1000
	next
	REM CLIQUE DROIT
	WshShell.SendKeys "+({F10})"
	WScript.Sleep 1000
	WshShell.SendKeys "D"
	WScript.Sleep 1000
	
	WshShell.SendKeys "{ESC}"
end if

REM CREATION DE LA TP QUI REACTIVE LE MIC AU BOUt DE X TEMP
REM SCHTASKS /Create /SC MINUTE /MO 1 /TN up_kineck_task /TR calc.exe /ST 14:00 /ET 16:00

Set Args = Nothing
set WshShell = Nothing




REM WshShell.SendKeys "{DOWN}"
REM WScript.Sleep 1000
REM WshShell.SendKeys "{DOWN}"
REM WScript.Sleep 1000
REM WshShell.SendKeys "{ENTER}"
REM WScript.Sleep 500
REM WshShell.SendKeys "*3"
REM WScript.Sleep 500
REM WshShell.SendKeys "~"
REM WScript.Sleep 2500