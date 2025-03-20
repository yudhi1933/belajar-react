function TesUi({data}) {
    return (
        <ul>
        {data.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    )
}

export default TesUi