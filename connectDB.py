"""
Connect from Python to Oracle via JDBC
Get JDBC-driver here: https://download.oracle.com/otn/utilities_drivers/jdbc/193/ojdbc8-full.tar.gz
Python 3.7.4
conda install -c conda-forge jaydebeapi==1.1.1 --force-reinstall -y
conda install -c conda-forge JPype1==0.6.3 --force-reinstall -y
"""
import jpype
import jaydebeapi

JHOME = jpype.getDefaultJVMPath()
jpype.startJVM(JHOME, '-Djava.class.path=/home/c/comtoist/M1/S2/TER/ojdbc6.jar')
con = jaydebeapi.connect('oracle.jdbc.driver.OracleDriver',
                         'jdbc:oracle:thin:comtoist/0dc8a76845@im2ag-oracle.e.ujf-grenoble.fr:1521:im2ag')
cur = con.cursor()
cur.execute('select * from lesclients')
r = cur.fetchall()
for i in r:
    print(r)
cur.close()
con.close()