# XLSX-to-STA

I was asked by my husband, ken to create a simple converter to convert xlsx files to sta files
note that this does NOT convert all XLSX files to STA filetypes as this is a very specific request, although, that would be something that I'm looking to do in the future.

To use this: 
1. on cli, navigate to mainFolder.
2. type npm start;
3. on your browser go to localhost:3000;

XLSX HEADERS:
Point number,	INPUT Date/time here,	Local Time,	GPS TIME OF WEEK,	Description

OUTPUT to STA file format: 

sta {
ID: "403"
DESC: "ROAD"
GTime:342065
Hi: 2.081 VERT
Ant: 2.081 2.081
}

