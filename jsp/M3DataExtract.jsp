<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" %>
<%@ include file="Connections/IDBCDTA600.jsp" %>
<%
Driver driver = (Driver)Class.forName(MM_IDBCDTA600_DRIVER).newInstance();
Connection conn = DriverManager.getConnection(MM_IDBCDTA600_STRING,MM_IDBCDTA600_USERNAME,MM_IDBCDTA600_PASSWORD);

String query = "select * from IDBCDTA600.ocusma where okcuno < 20000 and okcono = ? and okdivi = ?";

PreparedStatement statement = conn.prepareStatement(query);
statement.setString(1, MM_CONO);
statement.setInt(2, divi);

ResultSet rs = statement.executeQuery();

String json = "[</br>";

while(rs.next()) {
  json = json + "{\"customerno\": " + rs.getInt("OKCUNO") + ",";
  json = json + "\"customername\": \"" + rs.getString("OKCUNM") + "\",";
  json = json + "\"okcua1\": \"" + rs.getString("OKCUA1") + "\"},</br>";
}

if(json.length()>1) json = json.substring(0, json.length()-1);
json = json + "</br>]";
out.print(json);

if(rs!=null) rs.close();
if(statement!=null) statement.close();
if(conn!=null) conn.close();
%>