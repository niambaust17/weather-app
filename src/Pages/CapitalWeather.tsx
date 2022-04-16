import { Avatar, Box, Card, CardActionArea, CardContent, Container, Skeleton, Typography } from '@mui/material'
import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

interface WeatherTypes
{
    main: {
        temp: number,
        humidity: number,
    },
    wind: {
        speed: number
    },
    weather: {
        [index: number]: { icon: string, main: string }
    },
}

const CapitalWeather: FC = () =>
{
    const { capital } = useParams<{ capital: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [weatherInfo, setWeatherInfo] = useState<WeatherTypes>();

    useEffect(() =>
    {
        const fetchInformation = () =>
        {
            setLoading(true);
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${capital}&appid=ae8591ca06c5774da1b92eb2646c9f70`)
                .then(res => res.json())
                .then(data =>
                {
                    console.log(data.weather[0].icon);
                    console.log(data.weather[0].description);
                    setWeatherInfo(data);
                    setLoading(false);
                })
        }
        fetchInformation();
    }, [capital])

    return (
        <Container>
            <Box sx={{
                display: 'flex', justifyContent: 'center', margin: '25px'
            }} >
                <Card sx={{ width: 345 }}>
                    <CardActionArea>
                        <CardContent>
                            <Typography variant='h5' sx={{ textAlign: 'center' }}>
                                {loading ? <Skeleton /> :
                                    `${capital}`
                                }
                            </Typography>
                            <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center" }}>
                                {loading ?
                                    <Skeleton variant="circular" height="50px" width="50px" /> : <Avatar sx={{ height: "50px", width: "50px", border: '1px solid gray', marginRight: '10px' }} alt="Icon" src={`https://openweathermap.org/img/wn/${weatherInfo?.weather[0]?.icon}@4x.png`} />
                                }
                                <Typography variant='body1'>
                                    {
                                        loading ? <Skeleton width="60%" /> : `${weatherInfo?.weather[0]?.main}`
                                    }
                                </Typography>
                            </Box>

                            <Typography variant='h6'>
                                {loading ? <Skeleton width="50%" /> :
                                    `Temperature: ${weatherInfo?.main?.temp} K`}
                            </Typography>

                            <Typography variant='body1'>
                                {loading ? <Skeleton width="50%" /> :
                                    `Humidity: ${weatherInfo?.main?.humidity} %`}</Typography>

                            <Typography variant='body1'>
                                {loading ? <Skeleton width="50%" /> :
                                    `Wind Speed:  ${weatherInfo?.wind?.speed} km/h`}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Container >
    )
}

export default CapitalWeather
