<%@ page language="java" contentType="text/html; charset=ISO-8859-1" import="java.sql.*"
    pageEncoding="ISO-8859-1"%>
 <%@ include file="Connections/IDBCDTA602.jsp" %>
<%
Driver driver = (Driver)Class.forName(MM_IDBCDTA602_DRIVER).newInstance();
Connection conn = DriverManager.getConnection(MM_IDBCDTA602_STRING,MM_IDBCDTA602_USERNAME,MM_IDBCDTA602_PASSWORD);

String query = "select * from IDBCDTA602.ocusma where okcuno < 20000 and okcono = ? and okdivi = ?";

PreparedStatement statement = conn.prepareStatement(query);
statement.setString(1, MM_CONO);
statement.setInt(2, divi);

ResultSet rs = statement.executeQuery();

String json = "[";

while(rs.next()) {
  json = json + "{\"customerno\": " + rs.getInt("OKCUNO") + ",";
  json = json + "\"customername\": \"" + rs.getString("OKCUNM").trim() + "\",";
  json = json + "\"okcua1\": \"" + rs.getString("OKCUA1") + "\"},";
}

if(json.length()>1) json = json.substring(0, json.length()-1);
json = json + "]";
out.print(json);

if(rs!=null) rs.close();
if(statement!=null) statement.close();
if(conn!=null) conn.close();
%>