import { ImSpinner9 } from 'react-icons/im'

export default function DashboardLoading() {
    return (
        <div className=''>
            <div className='fixed z-20 inset-0 backdrop-blur-lg grid place-content-center'>
                <ImSpinner9 className='animate-spin' size={30} />
            </div>
        </div>
    )
}
