        var numberOfEmail = 3;     
		var currentDivision = "";
		var id ="";
		var pageCategory="";


		function myFunction() {
			document.getElementById("myDropdown").classList.toggle("show");
		}

	
		window.onclick = function(e) {
		if (!e.target.matches('.dropbtn')) {
		var myDropdown = document.getElementById("myDropdown");
			if (myDropdown.classList.contains('show')) {
			myDropdown.classList.remove('show');
			}
		}
		}

        function showInbox(){
			var xmlhttp = new XMLHttpRequest();  
			currentDivision="Inbox";   
			pageCategory="";
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
         			var email = document.getElementById("email");
         			email.innerHTML = xmlhttp.responseText;
				}
      		}
			xmlhttp.open("GET","retrieveemaillist?show=Inbox&number="+numberOfEmail+"&currentDivision=Inbox", true);
			xmlhttp.send();
			var inbox = document.getElementById("inbox");
			inbox.style.color = "orange";
			var important = document.getElementById("important");
			var sent = document.getElementById("sent");
			var trash = document.getElementById("trash");
			important.style.color = "white";
			sent.style.color = "white";
			trash.style.color = "white";
			var select = document.getElementById("myDropdown"); 
			var child = select.lastElementChild;  
			while (child) { 
				select.removeChild(child); 
				child = select.lastElementChild; 
			} 
			var option = document.createElement("a");
			option.innerHTML = "Important";
			option.style.cursor = "pointer";
			option.onclick = sendToImportant;
			var option1 = document.createElement("a");
			option1.innerHTML = "Sent";
			option1.style.cursor = "pointer";
			option1.onclick = sendToSent;
			var option2 = document.createElement("a");
			option2.innerHTML = "Trash";
			option2.style.cursor = "pointer";
			option2.onclick = sendToTrash;
			select.appendChild(option);
			select.appendChild(option1);
			select.appendChild(option2);
			enableButton();
          }
          
          function showImportant(){
			var xmlhttp = new XMLHttpRequest();     
			currentDivision="Important";  
			pageCategory="";
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
         			var email = document.getElementById("email");
         			email.innerHTML = xmlhttp.responseText;
				}
      		}
			xmlhttp.open("GET","retrieveemaillist?show=Important&number="+numberOfEmail+"&currentDivision=Important", true);
			xmlhttp.send();
			var important = document.getElementById("important");
			important.style.color = "orange";
			var inbox = document.getElementById("inbox");
			var sent = document.getElementById("sent");
			var trash = document.getElementById("trash");
			inbox.style.color = "white";
			sent.style.color = "white";
			trash.style.color = "white";
			var select = document.getElementById("myDropdown");
			var child = select.lastElementChild;  
			while (child) { 
				select.removeChild(child); 
				child = select.lastElementChild; 
			} 
			var option = document.createElement("a");
			option.innerHTML = "Inbox";
			option.style.cursor = "pointer";
			option.onclick = sendToInbox;
			var option1 = document.createElement("a");
			option1.innerHTML = "Sent";
			option1.style.cursor = "pointer";
			option1.onclick = sendToSent;
			var option2 = document.createElement("a");
			option2.innerHTML = "Trash";
			option2.style.cursor = "pointer";
			option2.onclick = sendToTrash;
			select.appendChild(option);
			select.appendChild(option1);
			select.appendChild(option2);
			enableButton();
          }

          function showSent(){
			var xmlhttp = new XMLHttpRequest();     
			currentDivision="Sent";  
			pageCategory="";
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
         			var email = document.getElementById("email");
         			email.innerHTML = xmlhttp.responseText;
				}
      		}
			xmlhttp.open("GET","retrieveemaillist?show=Sent&number="+numberOfEmail+"&currentDivision=Sent", true);
			xmlhttp.send();
			var sent = document.getElementById("sent");
			sent.style.color = "orange";
			var inbox = document.getElementById("inbox");
			var important = document.getElementById("important");
			var trash = document.getElementById("trash");
			inbox.style.color = "white";
			important.style.color = "white";
			trash.style.color = "white";
			var select = document.getElementById("myDropdown");
			var child = select.lastElementChild;  
			while (child) { 
				select.removeChild(child); 
				child = select.lastElementChild; 
			} 
			var option = document.createElement("a");
			option.innerHTML = "Inbox";
			option.style.cursor = "pointer";
			option.onclick = sendToInbox;
			var option1 = document.createElement("a");
			option1.innerHTML = "Important";
			option1.style.cursor = "pointer";
			option1.onclick = sendToImportant;
			var option2 = document.createElement("a");
			option2.innerHTML = "Trash";	
			option2.style.cursor = "pointer";
			option2.onclick = sendToTrash;		
			select.appendChild(option);
			select.appendChild(option1);
			select.appendChild(option2);
			enableButton();
          }
            
          function showTrash(){
			var xmlhttp = new XMLHttpRequest(); 
			currentDivision="Trash";    
			pageCategory="";  
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
         			var email = document.getElementById("email");
         			email.innerHTML = xmlhttp.responseText;
				}
      		}
			xmlhttp.open("GET","retrieveemaillist?show=Trash&number="+numberOfEmail+"&currentDivision=Trash", true);
			xmlhttp.send();
			var trash = document.getElementById("trash");
			trash.style.color = "orange";
			var inbox = document.getElementById("inbox");
			var important = document.getElementById("important");
			var sent = document.getElementById("sent");
			inbox.style.color = "white";
			important.style.color = "white";
			sent.style.color = "white";
			var select = document.getElementById("myDropdown");
			var child = select.lastElementChild;  
			while (child) { 
				select.removeChild(child); 
				child = select.lastElementChild; 
			} 
			var option = document.createElement("a");
			option.innerHTML = "Inbox";
			option.style.cursor = "pointer";
			option.onclick = sendToInbox;
			var option1 = document.createElement("a");
			option1.innerHTML = "Important";
			option1.style.cursor = "pointer";
			option1.onclick = sendToImportant;
			var option2 = document.createElement("a");
			option2.innerHTML = "Sent";
			option2.style.cursor = "pointer";
			option2.onclick = sendToSent;
			select.appendChild(option);
			select.appendChild(option1);
			select.appendChild(option2);
			enableButton();
          }

          function showPrevious(){
			var xmlhttp = new XMLHttpRequest();  
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
         			var email = document.getElementById("email");
         			email.innerHTML = xmlhttp.responseText;
				}
      		}
			xmlhttp.open("GET","retrieveemaillist?show=Previous&number="+numberOfEmail+"&currentDivision="+currentDivision +"&pageCategory="+pageCategory, true);
			xmlhttp.send();
          }

          function showNext(){
			var xmlhttp = new XMLHttpRequest();   
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
         			var email = document.getElementById("email");
         			email.innerHTML = xmlhttp.responseText;
				}
      		}
			xmlhttp.open("GET","retrieveemaillist?show=Next&number="+numberOfEmail+"&currentDivision="+currentDivision +"&pageCategory="+pageCategory, true);
			xmlhttp.send();
		
          }
		   
		  function showContent(elem){
			id = elem.parentNode.getAttribute('id');
			pageCategory = "Content";  
			var xmlhttp = new XMLHttpRequest();     
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
         			var email = document.getElementById("email");
         			email.innerHTML = xmlhttp.responseText;
				}
      		}
			xmlhttp.open("GET","getemail?show=Content&id="+id, true);
			xmlhttp.send();
			
		  }
		  

		  function sendToInbox(){
			var xmlhttp = new XMLHttpRequest();     
			var email = document.getElementById("email");
			var selected = [];
			for (var i=0; i< email.length; i++){
				if (email[i].checked){
					selected.push(email[i].value);
				}
			}
		

			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
					 email.innerHTML = xmlhttp.responseText;
				}
			}
			xmlhttp.open("POST","changemailbox",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("selected="+JSON.stringify(selected) +"&moveto=inbox&number="+ numberOfEmail+"&currentDivision="+currentDivision +"&pageCategory="+pageCategory);
			if (pageCategory == "Content"){
				pageCategory="";
			}
			showDivision();
		}

		  function sendToImportant(){
			var xmlhttp = new XMLHttpRequest();     
			var email = document.getElementById("email");
			var selected = [];
			for (var i=0; i< email.length; i++){
				if (email[i].checked){
					selected.push(email[i].value);
				}
			}
			
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
					 email.innerHTML = xmlhttp.responseText;
				}
			}
			xmlhttp.open("POST","changemailbox",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("selected="+JSON.stringify(selected) +"&moveto=important&number="+ numberOfEmail+"&currentDivision="+currentDivision +"&pageCategory="+pageCategory);
			if (pageCategory == "Content"){
				pageCategory="";
			}
			showDivision();
		}

		  function sendToSent(){
			var xmlhttp = new XMLHttpRequest();  
			var email = document.getElementById("email");
			var selected = [];
			for (var i=0; i< email.length; i++){
				if (email[i].checked){
					selected.push(email[i].value);
				}
			}   
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
					 email.innerHTML = xmlhttp.responseText;
				}
			}
			xmlhttp.open("POST","changemailbox",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("selected="+JSON.stringify(selected) +"&moveto=sent&number="+ numberOfEmail+"&currentDivision="+currentDivision +"&pageCategory="+pageCategory);
			if (pageCategory == "Content"){
				pageCategory="";
			}
			showDivision();
		}
		  
		  function sendToTrash(){
			var xmlhttp = new XMLHttpRequest();   
			var email = document.getElementById("email");
			var selected = [];
			for (var i=0; i< email.length; i++){
				if (email[i].checked){
					selected.push(email[i].value);
				}
			}  
			xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
					 email.innerHTML = xmlhttp.responseText;
				}
			}
			xmlhttp.open("POST","changemailbox",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("selected="+JSON.stringify(selected) +"&moveto=trash&number="+ numberOfEmail+"&currentDivision="+currentDivision +"&pageCategory="+pageCategory);
			if (pageCategory == "Content"){
				pageCategory="";
			}
			showDivision();
		}

		  function sendEmail(){
			  var toBox = document.getElementById("totextbox").value;
			  var subjectBox = document.getElementById("subjectTextBox").value;
			  var contentBox = document.getElementById("content").value;
			  var xmlhttp = new XMLHttpRequest();
			  var email = document.getElementById("email");
			  xmlhttp.onreadystatechange = function(){	
      			if (xmlhttp.readyState == 4  && xmlhttp.status ==200){
					 email.innerHTML = xmlhttp.responseText;
				}
			}
			  xmlhttp.open("POST","sendemail",true);
			  xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			  xmlhttp.send("sender=foozhiqian@gmail.com&recipient="+toBox+"&title="+subjectBox+"&content="+contentBox+"&currentDivision="+currentDivision+"&number="+numberOfEmail);
			  enableButton();

		  }

		  function showCompose(){
			  var string = "";
			  string += "<div id='newmessage' class='newmessage'>";
			  string += "<h3>New Message</h3>";
			  string += "<div class='to'>To: <input type='text' id='totextbox' name='toTextBox' size='100' class='totextbox'><br></div>";
			  string += "<div class='subject'> Subject: <input type = 'text' name='subjectTextBox' size= '100' id='subjectTextBox'><br></div>";
			  string += "<div class = 'textarea'><textarea name='content' rows='15' cols = '100' id='content' class='content'></textarea><br></div>";
			  string += "<button type='button' class='send' onclick='sendEmail()'>Send</button><br>";
			  string += "</div>";
			  document.getElementById("email").innerHTML = "";
			  document.getElementById("email").innerHTML = string;
			  document.getElementById("modal-opener").disabled = true;
			  document.getElementById("modal-opener").style.backgroundColor = "gray";
			  document.getElementById("previous").removeAttribute("onclick");
			  document.getElementById("previous").style.cursor= "default";
			  document.getElementById("next").removeAttribute("onclick");
			  document.getElementById("next").style.cursor="default";
		  }

		  function enableButton(){
			document.getElementById("modal-opener").disabled = false;
			document.getElementById("modal-opener").style.backgroundColor = "orange";
			document.getElementById("previous").onclick = showPrevious;
			document.getElementById("next").onclick = showNext;
			document.getElementById("previous").style.cursor= "pointer";
			document.getElementById("next").style.cursor="pointer";
		  }

		  function showDivision(){
			  if (currentDivision == "Inbox"){
				  showInbox();
			  }else if (currentDivision == "Important"){
				  showImportant();
			  }else if (currentDivision == "Sent"){
				  showSent();
			  }else if (currentDivision == "Trash"){
				  showTrash();
			  }
		  }
