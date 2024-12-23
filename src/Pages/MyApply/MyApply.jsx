import React, { useEffect } from 'react';

const MyApply = () => {

    useEffect(() => {
            document.title = "My Apply | প্রতিদৌড়";
          }, []);

    return (
        <div>
            my apply
        </div>
    );
};

export default MyApply;