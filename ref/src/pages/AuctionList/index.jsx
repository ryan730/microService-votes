import React from 'react';
import Overview from './components/Overview';
import TableList from './components/Table';
import { global, keyMean } from './utils/const'
import Loading from './utils/loading'

export default function Dashboard() {
  return (
    <div>
      {/* <Overview /> */}
      <Loading visible={true} ref={
                    (scope)=>{
                      if(scope){
                          global.loading = scope;
                      }
                    }
                    } 
        />
      <TableList />
    </div>
  );
}
