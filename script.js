document.getElementById('filterButton').addEventListener('click', function () {
    var month = document.getElementById('monthSelect').value;
    var percentage = document.getElementById('percentageSelect').value;

    fetch(`fetch_services.php?month=${month}&percentage=${percentage}`)
        .then(response => response.json())
        .then(data => {
            var serviceTable = document.getElementById('serviceTable');
            serviceTable.innerHTML = ''; // Clear existing table data

            data.forEach(service => {
                var row = `<tr>
                    <td>${service.serviceType}</td>
                    <td>${service.clientName}</td>
                    <td>${service.agentName}</td>
                    <td>${service.price.toFixed(2)}</td>
                    <td>${service.date}</td>
                </tr>`;
                serviceTable.innerHTML += row;
            });
        })
        .catch(error => console.error('Error fetching bookings:', error));
});
