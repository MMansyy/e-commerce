import vid from '../../assets/Animation - 1740358282525.mp4'

export default function NotFOund() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <video className='w-96 object-cover' autoPlay loop muted>
                <source src={vid} />
            </video>

        </div>
    )
}
