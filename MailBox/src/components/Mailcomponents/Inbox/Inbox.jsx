import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { receivedMailsGet } from '../../../Store/Mail-Slice/mail-slice';

const Inbox = () => {
  const dispatch = useDispatch();
  const recivedMails = useSelector(state => state.mail.receivedMail);
  console.log(recivedMails);

  useEffect(() => {
    dispatch(receivedMailsGet());
  }, [dispatch]);

 

  const mapData = recivedMails.map((item, index) => (
    <tr key={item.id}>
      <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td> {/* Use td instead of th for index */}
      <td className="px-6 py-4 whitespace-nowrap">{item.subject}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.senderEmail}</td>
      <td className="px-6 py-4 whitespace-nowrap">{item.to}</td>
     
    </tr>
  ));

  return (
    <div className="mt-5">
      <div className="mx-auto max-w-3xl">
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="bg-gray-200 text-gray-700 py-3 px-6 mb-0">
            Inbox
          </div>
          <div className="bg-white px-4 py-3 border-t border-gray-200 sm:px-6">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    NO
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    From
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    To
                  </th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mapData}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
