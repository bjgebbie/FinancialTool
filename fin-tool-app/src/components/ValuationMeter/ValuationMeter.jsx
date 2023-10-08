import ProgressBar from 'react-bootstrap/ProgressBar';

function ValuationMeter(props) {
    const {currentValue, fairValue} = props;
    if(Number(fairValue) >= Number(currentValue)) {
        const now = 100 * currentValue / fairValue;
        const remain = 100 - now;
        
        return (
            <div>
                <ProgressBar style={{height: 36}}>
                    <ProgressBar variant="info" now={now} key={1} />
                    <ProgressBar striped variant="success" now={remain} key={2} label={`${Math.round(remain)}%`} />
                </ProgressBar>
            </div>
        );   
    } else { 
        const now = 100 * fairValue / currentValue;
        const remain = 100 - now;
        return(
            <div>
                <ProgressBar>
                    <ProgressBar variant="info" now={now} key={1} />
                    <ProgressBar striped variant="danger" now={remain} key={2} label={`${Math.round(remain)}%`} />
                </ProgressBar>
            </div>
        );
    }
}

export default ValuationMeter