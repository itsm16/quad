import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDetailsModal } from '../store/features/uiSlice';

function DetailsModal() {
    const store = useSelector(state => state.ui.ui);
    const showModal = store.showDetails;
    const dispatch = useDispatch();

    // const location = "Delhi";

    // const types = {
    //   visit : {
    //     api: `https://nominatim.openstreetmap.org/ui/search.html?q=${location}`
    //   }
    // }

    // Default location for search (You can set this dynamically based on user selection)

    return (
        <div className={`modal ${showModal ? `modal-open` : ``}`}>
            <div className="md:w-[500px] h-[520px] p-2 border border-gray-700/50 bg-black/10 backdrop-blur-sm rounded-xl">
                {/* Close Button */}
                <div className="flex justify-end">
                    <button onClick={() => dispatch(setDetailsModal())} className="bg-white rounded-full text-black w-6 h-6 text-sm flex items-center justify-center">X</button>
                </div>

                {/* Embedded Search UI */}
                {/* {
                  types.type === api ?
                  <div className="w-full h-full mt-2">
                    <iframe
                        src={`https://nominatim.openstreetmap.org/ui/search.html?q=${location}`}
                        width="100%"
                        height="100%"
                        className="rounded-md border border-gray-700"
                    ></iframe>
                </div>
                :
                ""
                } */}
            </div>
        </div>
    );
}

export default DetailsModal;
