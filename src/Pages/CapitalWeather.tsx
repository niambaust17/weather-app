import { Avatar, Box, Card, CardActionArea, CardContent, Container, Skeleton, Typography } from '@mui/material'
import { FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

interface WeatherTypes
{
    temperature: string,
    weather_icons: string[],
    weather_descriptions: string[],
    wind_speed: number,
    pressure: number,
    precip: number
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
            fetch(`http://api.weatherstack.com/current?access_key=6c9d688738576389983c396d8aad817a&query=${capital}`)
                .then(res => res.json())
                .then(data =>
                {
                    setWeatherInfo(data.current);
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
                            <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "flex-start" }}>
                                {loading ?
                                    <Skeleton variant="circular" height="50px" width="50px" /> : <Avatar sx={{ height: '50px', width: '50px', marginRight: '10px' }} alt="Icon" src={weatherInfo?.weather_icons[0]} />
                                }
                                <Typography variant='body1'>
                                    {
                                        loading ? <Skeleton width="60%" /> : `${weatherInfo?.weather_descriptions[0]}`
                                    }
                                </Typography>
                            </Box>
                            <Typography variant='h6'>
                                {loading ? <Skeleton width="50%" /> :
                                    `Temperature: ${weatherInfo?.temperature}°C`}
                            </Typography>

                            <Typography variant='body1'>
                                {loading ? <Skeleton width="50%" /> :
                                    `Wind: ${weatherInfo?.wind_speed} kmph`}</Typography>

                            <Typography variant='body1'>
                                {loading ? <Skeleton width="50%" /> :
                                    `Precip:  ${weatherInfo?.precip} mm`}</Typography>

                            <Typography variant='body1'>
                                {loading ? <Skeleton width="50%" /> :
                                    `Pressure: ${weatherInfo?.pressure} mb`}</Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Box>
        </Container >
    )
}

export default CapitalWeather
