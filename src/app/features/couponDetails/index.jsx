import React, { Suspense, lazy } from 'react';
const Presenter = lazy(() => import('./presenter'));

function CouponDetails() {
    return (
        
            <Suspense fallback={<div>Coupon details are loading. Please wait...</div>}>
                <section>
                    <Presenter />
                </section>
            </Suspense>
      
    );
}

export default CouponDetails;