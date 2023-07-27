import "flowbite";
import Migration from "./Migration";
import EditableTable from "./EditTable";
import Publish from "./Publish";
import {useState} from "react"
import Hide from "./Hide";
import '../styles/global.css'

const Table = () => {

  return (
    <>
      <div className="flex w-full justify-center py-10 items-start bg-gray-600">
      
        <Migration />
        <Publish />
      </div>
        <div id="your-table-id">
        <EditableTable />
        {/* <Hide /> */}
        </div>

      
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
    </>
  );
};

export default Table;
