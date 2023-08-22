import { formatDistanceToNow } from 'date-fns';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
    Box,
    Button,
    Card,
    CardActions,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    SvgIcon
} from '@mui/material';
import { useEffect, useState } from 'react';

export const Promocoes = ({ promocoesView }) => {

    const [produtos, setProdutos] = useState(promocoesView ?? []);
    
    useEffect(() => {
        setProdutos(promocoesView ?? [])
    },[promocoesView])

    return (
        <Card>
            <CardHeader title={produtos[0]?.descricao} />
            <List>
                {produtos.map((product, index) => {
                    const hasDivider = index < produtos.length - 1;
                    const ago = formatDistanceToNow(product.preco);

                    return (
                        <ListItem
                            divider={hasDivider}
                            key={product.id}
                        >
                            <ListItemAvatar>
                                {
                                    product.image
                                        ? (
                                            <Box
                                                component="img"
                                                src={product.image}
                                                sx={{
                                                    borderRadius: 1,
                                                    height: 48,
                                                    width: 48
                                                }}
                                            />
                                        )
                                        : (
                                            <Box
                                                sx={{
                                                    borderRadius: 1,
                                                    backgroundColor: 'neutral.200',
                                                    height: 48,
                                                    width: 48
                                                }}
                                            />
                                        )
                                }
                            </ListItemAvatar>
                            <ListItemText
                                primary={product.name}
                                primaryTypographyProps={{ variant: 'subtitle1' }}
                                secondary={`Updated ${ago} ago`}
                                secondaryTypographyProps={{ variant: 'body2' }}
                            />
                            <IconButton edge="end">
                                <SvgIcon>
                                    <EllipsisVerticalIcon />
                                </SvgIcon>
                            </IconButton>
                        </ListItem>
                    );
                })}
            </List>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                    color="inherit"
                    endIcon={(
                        <SvgIcon fontSize="small">
                            <ArrowRightIcon />
                        </SvgIcon>
                    )}
                    size="small"
                    variant="text"
                >
                    View all
                </Button>
            </CardActions>
        </Card>
    )
};