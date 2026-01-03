import styled from 'styled-components';

export const Card = styled.section`
  background: var(--charcoal-surface2);
  border-radius: 12px;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

export const CardTitle = styled.h3`
  margin: 0;
  font-size: 12px;
  font-weight: 600;
`;

export const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const CardText = styled.p`
  margin: 0;
  font-size: 12px;
  color: var(--charcoal-text2);
  white-space: pre-wrap;
`;
