import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import axios from 'axios';

const SolvedTasksBar = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/solved-tasks-count'); 
                setData(response.data);
            } catch (error) {
                console.error('Error with receiving data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div style={{ height: '500px' }}>
            <ResponsiveBar
                data={data}
                /* keys={['avg_solved_tasks_count']} */
                keys={['avg_solved_tasks_count', 'avg_correct_tasks_count', 'avg_executable_tasks_count']}
                indexBy="task_area_id"
                margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                padding={0.3}
                valueScale={{ type: 'linear' }}
                indexScale={{ type: 'band', round: true }}
                colors={{ scheme: 'nivo' }}
                groupMode='grouped'
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Database',
                    legendPosition: 'middle',
                    legendOffset: 32,
                    format: value => {
                        switch (value) {
                            case 1:
                                return 'PostgreSQL';
                            case 2:
                                return 'Cassandra';
                            case 3:
                                return 'Neo4J';
                            case 4:
                                return 'MongoDB';
                            default:
                                return value;
                        }
                    }
                }}
                axisLeft={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Average amount of solved tasks',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                legends={[
                    {
                        dataFrom: 'keys',
                        anchor: 'bottom-right',
                        direction: 'column',
                        justify: false,
                        translateX: 120,
                        translateY: 0,
                        itemsSpacing: 2,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemDirection: 'left-to-right',
                        itemTextColor: '#000',
                        symbolSize: 20,
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    );
};

export default SolvedTasksBar;
