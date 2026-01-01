import styled from 'styled-components';

export default function Header() {
  return <StyledHeader>bookmark helper</StyledHeader>;
}

const StyledHeader = styled.header`
  background-color: var(--charcoal-surface3);
  color: var(--charcoal-brand);
  text-transform: uppercase;
  letter-spacing: 1.5px;
  padding: 12px 4px;
  text-align: center;
  font-weight: 700;

`;
