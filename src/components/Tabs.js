
import BucketList from "../hooks/GetObject";
import React from "react";
import Table from './Table';
import RawTable from './RawTable';
import BucketListRaw from '../hooks/GetRawObject'

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-" + color + "-600 bg-gray-800"
                    : "text-black bg-" + color + "-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                <i className="fas fa-space-shuttle text-base mr-1"></i> Review
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-" + color + "-600 bg-gray-800"
                    : "text-black bg-" + color + "-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                <i className="fas fa-cog text-base mr-1"></i>  Raw Data
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 3
                    ? "text-" + color + "-600 bg-gray-800"
                    : "text-black bg-" + color + "-600")
                }
                onClick={e => {
                  e.preventDefault();
                  setOpenTab(3);
                }}
                data-toggle="tab"
                href="#link3"
                role="tablist"
              >
                <i className="fas fa-briefcase text-base mr-1"></i>  Published
              </a>
            </li>
          </ul>
          
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                <Table />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                {/* <RawTable /> */}
                {/* <BucketListRaw /> */}
                Why is this here? 
                </div>
                <div className={openTab === 3 ? "block" : "hidden"} id="link3">
                Bye
                
                </div>
              </div>
            
      </div>
    </>
  );
};

export default function TabsRender() {
  return (
    <>
      <Tabs />
    </>
  )
}