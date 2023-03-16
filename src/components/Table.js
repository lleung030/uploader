import BucketList from "../hooks/GetObject";
import Publish from '../hooks/Publish';
import 'flowbite';



const Table = () => {
    return (
        
<>
<div class="flex w-full justify-center py-5 items-start bg-gray-600">
<Publish />
</div>
<div class="flex relative shadow-md sm:rounded-lg w-full overflow-hidden bg-gray-500 p-20">
    <table class="w-full text-md text-gray-500 dark:text-gray-400">
        <thead class="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    <div class="flex items-center font-large text-gray-900 whitespace-nowrap dark:text-white">
                        ID
                    </div>
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Speaker  
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Title
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Topic
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Track
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Date
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    File
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Action
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    
                </th>
                <th scope="col" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Status
                </th>
            </tr>
        </thead>
        <tbody>
            <BucketList />
        </tbody>
        <tbody id="myTable"></tbody>
    </table>
</div>
<script src="../path/to/flowbite/dist/flowbite.min.js"></script>
        </>
)}

export default Table;
