<%@ page contentType="text/html; charset=utf-8" language="java" import="java.sql.*" %>
<%@ include file="Connections/IDBCDTA600.jsp" %>
<%
Driver driver = (Driver)Class.forName(MM_IDBCDTA600_DRIVER).newInstance();
Connection conn = DriverManager.getConnection(MM_IDBCDTA600_STRING,MM_IDBCDTA600_USERNAME,MM_IDBCDTA600_PASSWORD);

Driver Driverrs = (Driver)Class.forName(MM_IDBCDTA600_DRIVER).newInstance();

Connection Connrs = DriverManager.getConnection(MM_IDBCDTA600_STRING,MM_IDBCDTA600_USERNAME,MM_IDBCDTA600_PASSWORD);

//Call Stored Procedure with parameters,
String sugr = "12426";
String suno = " ";
String puno = " ";
String orty = " "; 
String curr = " ";

CallableStatement callSP = Connrs.prepareCall("{call Z1RECTLE(?,?,?,?,?,?,?,?)}");

callSP.setInt(1, MM_CONOi);
callSP.setString(2, MM_DIVI);
callSP.setString(3, MM_FACI);
callSP.setString(4, sugr); System.out.print("Sugr " + sugr);
callSP.setString(5,suno); System.out.print("Suno " + suno);
callSP.setString(6,puno); System.out.print("Puno " + puno);
callSP.setString(7,orty); System.out.print("Orty " + orty);
callSP.setString(8,curr); System.out.print("Curr " + curr);

callSP.execute();
ResultSet rsinv = callSP.getResultSet();

String json = "[";

while(rsinv.next()) {
  json = json + "{\"Z1cucd\": " + rsinv.getString("Z1CUCD") + ",";
  json = json + "\"Z1sera\": " + rsinv.getDouble("Z1SERA") + ",";
  json = json + "\"Z1tcur\": " + rsinv.getDouble("Z1TCUR") + ",";
  json = json + "\"Z1trec\": " + rsinv.getDouble("Z1TREC") + ",";
  json = json + "\"Z1twgt\": " + rsinv.getDouble("Z1TWGT") + ",";
  json = json + "\"Z1puno\": \"" + rsinv.getString("Z1PUNO") + "\",";
  json = json + "\"Z1pnli\": " + rsinv.getInt("Z1PNLI") + ",";
  json = json + "\"Z1orqa\": " + rsinv.getDouble("Z1ORQA") + ",";
  json = json + "\"Z1rvqa\": " + rsinv.getDouble("Z1RVQA") + ",";
  json = json + "\"Z1ivqa\": " + rsinv.getDouble("Z1IVQA") + ",";
  json = json + "\"Z1pusl\": \"" + rsinv.getString("Z1PUSL") + "\",";
  json = json + "\"Z1orty\": \"" + rsinv.getString("Z1ORTY") + "\",";
  json = json + "\"Z1suno\": \"" + rsinv.getString("Z1SUNO") + "\",";
  json = json + "\"Z1pric\": " + rsinv.getDouble("Z1PRIC") + ",";
  json = json + "\"Z1untp\": " + rsinv.getDouble("Z1UNTP") + ",";
  json = json + "\"Z1vtp1\": " + rsinv.getDouble("Z1VTP1") + ",";
  json = json + "\"Z1itno\": \"" + rsinv.getString("Z1ITNO") + "\",";
  json = json + "\"Z1pitd\": \"" + rsinv.getString("Z1PITD") + "\",";
  json = json + "\"Z1sudo\": \"" + rsinv.getString("Z1SUDO") + "\",";
  json = json + "\"Z1dwdt\": " + rsinv.getInt("Z1DWDT") + ",";
  json = json + "\"Z1puun\": \"" + rsinv.getString("Z1PUUN") + "\",";
  json = json + "\"Z1pupr\": " + rsinv.getDouble("Z1PUPR") + ",";
  json = json + "\"Z1ppun\": \"" + rsinv.getString("Z1ppun") + "\"},";
}

if(json.length()>1) json = json.substring(0, json.length()-1);
json = json + "]";
out.print(json);

if(rsinv!=null) rsinv.close();
//if(statement!=null) statement.close();
//if(conn!=null) conn.close();
%>
