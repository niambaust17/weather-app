import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Skeleton, Typography } from '@mui/material'
import { FC, useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

interface CountryTypes
{
    flags:
    {
        png: string
    }
    name: { common: string },
    capital: string[],
    area: number,
    population: number,
    latlng: number[],
    region: string,
    subregion: string,
}

const CountryInformation: FC = () =>
{
    const navigate = useNavigate();
    const { country } = useParams<{ country: string }>();
    const [loading, setLoading] = useState<boolean>(false);
    const [countryInfo, setCountryInfo] = useState<CountryTypes[]>([]);

    useEffect(() =>
    {
        const fetchInformation = () =>
        {
            setLoading(true);
            fetch(`https://restcountries.com/v3.1/name/${country}`)
                .then(res => res.json())
                .then(data =>
                {
                    setCountryInfo(data);
                    setLoading(false);
                })
        }
        fetchInformation();
    }, [country])

    return (
        <Container>
            {
                <Box sx={{ display: 'flex', justifyContent: 'center', margin: '25px' }}>
                    <Card sx={{ maxWidth: 345 }}>
                        {loading ? <Skeleton variant="rectangular" animation="wave" width="320px" height="192px" /> :
                            <CardMedia
                                component="img"
                                height="auto"
                                image={countryInfo[0]?.flags?.png}
                                alt="Flag"
                            />
                        }
                        <CardContent>
                            <Typography gutterBottom variant="h5">
                                {loading ? <Skeleton /> :
                                    `${countryInfo[0]?.name.common}`
                                }
                            </Typography>

                            <Typography variant="body1" color="text.secondary">
                                {loading ? <Skeleton /> :
                                    `Capital: ${countryInfo[0]?.capital}`
                                }
                            </Typography>

                            <Typography variant="body1" color="text.secondary">
                                {loading ? <Skeleton /> :
                                    `Area: ${countryInfo[0]?.area} sq km`
                                }
                            </Typography>

                            <Typography variant="body1" color="text.secondary">
                                {loading ? <Skeleton /> :
                                    `Population: ${countryInfo[0]?.population}`
                                }
                            </Typography>

                            <Typography variant="body1" color="text.secondary">
                                {loading ? <Skeleton /> :
                                    `Latitude: ${countryInfo[0]?.latlng[0]}`
                                }
                            </Typography>

                            <Typography variant="body1" color="text.secondary">
                                {loading ? <Skeleton /> :
                                    `Longitude: ${countryInfo[0]?.latlng[1]}`
                                }
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {loading ? <Skeleton /> :
                                    `Region: ${countryInfo[0]?.region}`
                                }
                            </Typography>

                            <Typography variant="body1" color="text.secondary">
                                {loading ? <Skeleton /> :
                                    `Sub Region: ${countryInfo[0]?.subregion}`
                                }
                            </Typography>
                            {!loading &&
                                <Button
                                    variant="outlined"
                                    sx={{ mt: 2 }}
                                    onClick={() => navigate(`/capital-weather/${countryInfo[0]?.capital}`)}
                                >
                                    Weather
                                </Button>
                            }
                        </CardContent>
                    </Card>
                </Box>
            }
        </Container>
    )
}

export default CountryInformation
