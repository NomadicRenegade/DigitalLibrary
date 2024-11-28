from alembic import op
import sqlalchemy as sa

def upgrade():
    # Create files table
    op.create_table(
        'files',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('filename', sa.String(255), nullable=False),
        sa.Column('file_type', sa.String(50), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('upload_date', sa.DateTime(), nullable=False),
        sa.Column('size', sa.Integer(), nullable=False),
        sa.Column('status', sa.String(50), nullable=False),
        sa.Column('location', sa.String(512), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )

    # Create metadata table
    op.create_table(
        'metadata',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('file_id', sa.Integer(), nullable=False),
        sa.Column('content_type', sa.String(100)),
        sa.Column('dimensions', sa.String(100)),
        sa.Column('duration', sa.Float),
        sa.Column('format', sa.String(50)),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.Column('page_count', sa.Integer),
        sa.Column('word_count', sa.Integer),
        sa.Column('has_images', sa.Boolean),
        sa.Column('sheet_count', sa.Integer),
        sa.Column('extra_data', sa.JSON),
        sa.ForeignKeyConstraint(['file_id'], ['files.id']),
        sa.PrimaryKeyConstraint('id')
    )

    # Create analysis table
    op.create_table(
        'analysis',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('file_id', sa.Integer(), nullable=False),
        sa.Column('confidence', sa.Float, default=0.0),
        sa.Column('status', sa.String(50), default='pending'),
        sa.Column('results', sa.JSON),
        sa.Column('model_version', sa.String(50)),
        sa.ForeignKeyConstraint(['file_id'], ['files.id']),
        sa.PrimaryKeyConstraint('id')
    )

    # Create tags table
    op.create_table(
        'tags',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('name', sa.String(100), nullable=False),
        sa.Column('category', sa.String(50)),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('name')
    )

    # Create file_tags association table
    op.create_table(
        'file_tags',
        sa.Column('file_id', sa.Integer(), nullable=False),
        sa.Column('tag_id', sa.Integer(), nullable=False),
        sa.ForeignKeyConstraint(['file_id'], ['files.id']),
        sa.ForeignKeyConstraint(['tag_id'], ['tags.id']),
        sa.PrimaryKeyConstraint('file_id', 'tag_id')
    )

def downgrade():
    op.drop_table('file_tags')
    op.drop_table('tags')
    op.drop_table('analysis')
    op.drop_table('metadata')
    op.drop_table('files')