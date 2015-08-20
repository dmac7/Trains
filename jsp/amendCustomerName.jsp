<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" %>
<%@ include file="Connections/IDBCDTA602.jsp" %>
<jsp:useBean id="LottieBean" class="com.idb.PortalBeans.MvxBean" scope="session"/>

<%
String cuno = request.getParameter("cuno");
String newname = request.getParameter("newname");

System.out.println("new name is " + newname);

LottieBean.setCompany("602");
LottieBean.setUsername(MM_IDBCDTA602_USERNAME);
LottieBean.setPassword(MM_IDBCDTA602_PASSWORD);
LottieBean.setPort(MM_PORT);

LottieBean.setInitialise("CRS610MI");

String apiParameters = "CRS610MI ChgBasicData   " + MM_CONO + "     " + cuno + "     " + newname;

LottieBean.setMessage(apiParameters);
String returnMessage = LottieBean.getMessage();

System.out.println(returnMessage);

%> 