import './spinner.style.scss';

const Spinner = () => { 
    return (
        <div className='spinner-cotainer'>
            <div className='lds-ellipsis'><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export { Spinner };
