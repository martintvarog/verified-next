import {ClimbingBoxLoader} from "react-spinners";

const Spinner = (loading: boolean) => {
    return (
        <div>
            <ClimbingBoxLoader
                color={'#8A2BE2'}
                loading={loading}
                // cssOverride={override}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
        </div>
    )
}

export default Spinner;