
#!/usr/bin/python/
#simple script to wrangle total crimes against women by year. 
import re

mydict = {}
counter = 0
for line in open('persons_arrested.csv','r'):
  if counter == 0:
    counter =+ 1 
  else:
      row =line.split(",")
      newrow = []
      for r in row:
        nr = r.strip('"')
        newrow.append(nr)
      name = newrow[0].capitalize()
      if name != "Total (all-india)" and name != "Total (uts)" and name != "Total (states)" :
        name_sp =  name.split(" ")
        #need to capitalize the names here to get this work; otherwise rows won't match
        if len(name_sp) > 1:
          if len(name_sp) == 2:
            print name_sp
            name =  name_sp[0] + " " + name_sp[1].capitalize()
            print name
          if len(name_sp) == 3:
            mya = "&"
            maybea = name_sp[1]
            if maybea == mya:
              name = name_sp[0] + " and " + name_sp[2].capitalize()
          if len(name_sp) > 3:
            name = ''
            for n in name_sp:
              name = name + n.capitalize()
        name = re.sub("&", " and ", name)
        numb =  newrow[15]
        crime_type = newrow[1]
        if name in mydict:
          vval = mydict[name]
          if crime_type in vval:
            more_crime = vval[crime_type]
            vval[crime_type] = more_crime + int(numb)
          else: 
            vval[crime_type] = int(numb)
        else:
          mydict[name] = dict([(crime_type, numb)])

with open("all_crimes.csv", "wb") as f:
  f.write("NAME_1,value \n")
  for key,value in sorted(mydict.items()): 
    provin_name = key
    total_crime  = 0
    for v in value.itervalues():
      total_crime = total_crime + int(v)
    f.write(provin_name + "," + str(total_crime/2) + "\n")

f.close()
   