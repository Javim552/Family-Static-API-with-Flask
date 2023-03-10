"""empty message

Revision ID: 58c7f41bbf9f
Revises: 5a379edc8ee4
Create Date: 2023-01-31 19:17:25.321865

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '58c7f41bbf9f'
down_revision = '5a379edc8ee4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('nombre', sa.String(length=120), nullable=False))
        batch_op.create_unique_constraint(None, ['nombre'])

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint(None, type_='unique')
        batch_op.drop_column('nombre')

    # ### end Alembic commands ###
