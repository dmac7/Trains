<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<% 
String yourTextField = request.getParameter("textField"); 
int yourNumber = Integer.parseInt(request.getParameter("numberField")); 
// Send to Ecilpse 
//System.out.println("{\"success\":true,\"msg\":\"You typed " + yourTextField + " and " + yourNumber + "\"}");
// send to sencha: 
out.println("{\"success\":true,\"msg\":\"You typed " + yourTextField + " and " + yourNumber + "\"}");
%>