// eslint-disable-next-line
import React, { useState } from 'react';
// eslint-disable-next-line
import { Box, Card, CardActions, CardContent, Collapse, Button, Typography, Rating, useTheme, useMediaQuery } from '@mui/material';
// eslint-disable-next-line
import { useGetProductsQuery } from 'state/api';
import Header from 'components/Header';
import Loader from 'components/Loader';

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card sx={{
      backgroundImage: 'none',
      backgroundColor: theme.palette.background.alt,
      borderRadius: "0.55rem"
    }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color={theme.palette.secondary[700]} gutterBottom>
          {category}
        </Typography>
        <Typography variant="h5" component="div">{name}</Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>NGN {Number(price).toFixed(2)}</Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button variant='primary' size="small" onClick={() => setIsExpanded(!isExpanded)}>See More</Button>
      </CardActions>
      <Collapse in={isExpanded} timeout="auto" unmountOnExit sx={{
        color: theme.palette.neutral[300]
      }}>
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>Yearly Sales This Year: {stat.yearlySalesTotal}</Typography>
          <Typography>Yearly Units Sold This Year: {stat.yearlyTotalSoldUnit}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

const Products = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetProductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  
  return (
    <Box m="1.5rem 1.5rem" pb="2rem">
        <Header title="PRODUCTS" subtitle="See your list of products." />
        {data || !isLoading ? (
          <Box 
            mt="20px" 
            display="grid" 
            gridTemplateColumns={isNonMobile ? "repeat(4, minmax(0, 1fr))" : '1fr'} 
            justifyContent="space-between"
            rowGap="20px"
            columnGap="1.33%"
            sx={{
              "& > div": {
                // gridColumn: isNonMobile ? undefined : 'span 4'
              }
            }}
          >
            {data?.map(({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat} 
              />
            ))}
          </Box>
        ) : (
          <Box>
            <Loader style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }} color={theme.palette.secondary[200]} />
          </Box>
        )}
    </Box>
  )
}

export default Products