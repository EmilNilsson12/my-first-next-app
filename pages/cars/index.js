export default function CarsList() {
    let cars = [
        {
            carname: 'lambo',
            color: 'red',
        },
        {
            carname: 'tesla',
            color: 'blue',
        },
    ];
    return (
        <>
            <h1>Cars List</h1>
            {cars.map((car) => (
                <div key={car.carname}>
                    <h2>{car.carname}</h2>
                    <p>{car.color}</p>
                </div>
            ))}
        </>
    );
}
